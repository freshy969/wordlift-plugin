<?php
/**
 * This file provides the Post_Type_Rule_Validator which validates whether a post type matches or not the given type.
 *
 * @author David Riccitelli <david@wordlift.io>
 * @since 3.25.0
 * @package Wordlift\Mappings\Validators
 */

namespace Wordlift\Mappings\Validators;

/**
 * Define the Post_Type_Rule_Validator class.
 *
 * @package Wordlift\Mappings\Validators
 */
class Post_Type_Rule_Validator implements Rule_Validator {

	/**
	 * Post_Type_Rule_Validator constructor.
	 *
	 * When initializing the class hooks to `wl_mappings_rule_validators`.
	 */
	public function __construct() {

		add_filter( 'wl_mappings_rule_validators', array( $this, 'wl_mappings_rule_validators' ) );

	}

	/**
	 * Hook to `wl_mappings_rule_validators` to register ourselves.
	 *
	 * @param array $value An array with validators.
	 *
	 * @return array An array with validators plus ours.
	 */
	public function wl_mappings_rule_validators( $value ) {

		$value['post_type'] = $this;

		return $value;
	}

	/**
	 * {@inheritdoc}
	 */
	public function get_label() {
		return __( 'Post Type', 'wordlift' );
	}

	/**
	 * {@inheritdoc}
	 */
	public function is_valid( $post_id, $operator, $operand_1, $operand_2 ) {

		// Get the post type and then check whether it matches or not according to the operator.
		$post_type = get_post_type( $post_id );

		switch ( $operator ) {
			case Rule_Validator::IS_NOT_EQUAL_TO:
				return $post_type !== $operand_2;

			case Rule_Validator::IS_EQUAL_TO:
				return $post_type === $operand_2;

			default:

		}

		return false;
	}

}
