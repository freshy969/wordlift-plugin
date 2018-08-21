<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 03.08.18
 * Time: 22:21
 */

class Wordlift_Schemaorg_Service {

	public function __construct() {

		add_action( 'wp_ajax_wl_sync_schemaorg', array( $this, 'load' ) );

	}

	public function load() {

		$reply = wp_remote_post( 'http://turin.wordlift.it:41660/graphql', array(
			'method'  => 'POST',
			'headers' => array(
				'content-type' => 'application/json; charset=UTF-8',
			),
			'body'    => wp_json_encode( array(
				'query'     => "
					query {
					schemaClasses {
						name
						dashname: name(format: DASHED)
						description
						children {
							dashname: name(format: DASHED)
						}
					}
				}'",
				'variables' => null,
			) ),
		) );

		if ( is_wp_error( $reply ) ) {
			// Error.
			return;
		}

		if ( ! isset( $reply['response']['code'] )
		     || ! is_numeric( $reply['response']['code'] ) ) {
			// Error: response code not set or invalid.
			return;
		}

		if ( 2 !== (int) $reply['response']['code'] / 100 ) {
			// Error: status code not OK.
			return;
		}

		if ( ! isset( $reply['body'] ) ) {
			// Error: body not set.
			return;
		}

		$json = json_decode( $reply['body'], true );

		if ( null === $json ) {
			// Error: invalid body.
			return;
		}

		if ( ! isset( $json['schemaClasses'] ) ) {
			// Error: invalid json.
			return;
		}

		foreach ( $json['schemaClasses'] as $schema_class ) {
			$slug = $schema_class['dashname'];
			$term = term_exists( $slug, Wordlift_Entity_Type_Taxonomy_Service::TAXONOMY_NAME );

			$args = array(
				'parent'      => 0,
				'description' => $schema_class['description'],
				'slug'        => $schema_class['dashname'],
			);
			if ( null !== $term ) {
				wp_update_term( $term['term_id'], Wordlift_Entity_Type_Taxonomy_Service::TAXONOMY_NAME, $args );
			} else {
				$term = wp_insert_term( $schema_class['name'], Wordlift_Entity_Type_Taxonomy_Service::TAXONOMY_NAME, $args );
			}

			// Update the parents/children relationship.
			delete_term_meta( $term['term_id'], '_wl_parent_of' );
			foreach ( $schema_class['children'] as $child ) {
				add_term_meta( $term['term_id'], '_wl_parent_of', $child['dashname'] );
			}

			// Update the term name.
			delete_term_meta($term['term_id'], '_wl_name');
			update_term_meta($term['term_id'], '_wl_name', $schema_class['name']);

		}

	}

}