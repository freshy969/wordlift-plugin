<?php

use Wordlift\Mappings\Mappings_DBO;
use Wordlift\Mappings\Mappings_Transform_Function;
use Wordlift\Mappings\Mappings_Validator;
use Wordlift\Mappings\Validators\Rule_Groups_Validator;
use Wordlift\Mappings\Validators\Rule_Validators_Registry;
use Wordlift\Mappings\Validators\Taxonomy_Rule_Validator;

if ( ! class_exists( 'Test_Transform_function' ) ) {
	class Test_Transform_function implements Mappings_Transform_Function {
		public function __construct() {
			add_filter( 'wl_mappings_transformation_functions',
				array( $this, 'wl_mappings_transformation_functions' ) );
		}

		public function wl_mappings_transformation_functions( $value ) {

			$value[] = $this;

			return $value;
		}

		public function get_name() {
			return 'test_transform_function';
		}

		public function get_label() {
			return 'Test_Transform_Function';
		}

		public function transform_data( $data, $jsonld, &$references, $post_id ) {
			return 'foo';
		}
	}
}


/**
 * Tests: Mappings filter test.
 *
 * Tests the mappings filters
 *
 * @since 3.26.0
 * @package Wordlift
 * @subpackage Wordlift/tests
 */
class Mappings_Filter_Test extends Wordlift_Unit_Test_Case {
	/**
	 * @var Mappings_DBO
	 */
	private $dbo;
	/**
	 * @var Wordlift_Jsonld_Service
	 */
	private $jsonld_service;
	/**
	 * @var Mappings_Validator
	 */
	private $validator;

	function setUp() {
		parent::setUp(); // TODO: Change the autogenerated stub
		// Initialize dependencies for the test.
		$this->dbo                = new Mappings_DBO();
		$default_rule_validator   = new Taxonomy_Rule_Validator();
		$rule_validators_registry = new Rule_Validators_Registry( $default_rule_validator );
		$rule_groups_validator    = new Rule_Groups_Validator( $rule_validators_registry );
		$this->validator          = new Mappings_Validator( $this->dbo, $rule_groups_validator );
		$this->jsonld_service     = Wordlift_Jsonld_Service::get_instance();
	}

	private function create_new_mapping_item( $taxonomy, $taxonomy_value, $properties ) {
		$mapping_id = $this->dbo->insert_mapping_item( 'foo' );
		// Create a rule group.
		$rule_group_id = $this->dbo->insert_rule_group( $mapping_id );

		$rule_id = $this->dbo->insert_or_update_rule_item(
			array(
				'rule_field_one'   => $taxonomy,
				'rule_logic_field' => '===',
				'rule_field_two'   => $taxonomy_value,
				'rule_group_id'    => $rule_group_id,
			)
		);
		foreach ( $properties as $property ) {
			$property['mapping_id'] = $mapping_id;
			$this->dbo->insert_or_update_property( $property );
		}
	}

	public function test_when_added_filters_should_correctly_produce_jsonld_output() {
		$post_id = $this->factory()->post->create( array() );
		wp_add_object_terms( $post_id, 'how-to', 'category' );
		// create filters
		$manual_properties = array(
			array(
				'property_name'      => '@type',
				'field_type'         => 'text',
				'field_name'         => 'HowTo',
				'transform_function' => 'none',
				'property_status'    => Mappings_Validator::ACTIVE_CATEGORY,
				'mapping_id'         => 'foo'
			),
		);

		$mapping_id = 'foo';

		add_filter( 'wl_mappings_register_mappings', function ( $mappings ) use ( $mapping_id ) {
			array_push( $mappings, array(
				'mapping_id'     => $mapping_id,
				'mapping_title'  => 'foo title',
				'mapping_status' => 'active'
			) );

			return $mappings;
		} );

		add_filter( 'wl_mappings_register_rule_groups', function ( $rule_groups ) use ( $mapping_id ) {
			array_push( $rule_groups, array(
				'rule_group_id' => 'rg_recipe_1',
				'mapping_id'    => $mapping_id
			) );

			return $rule_groups;
		} );

		add_filter( 'wl_mappings_register_rules', function ( $rules ) {
			array_push( $rules, array(
				'rule_field_one'   => 'category',
				'rule_logic_field' => '===',
				'rule_field_two'   => 'how-to',
				'rule_group_id'    => 'rg_recipe_1',
			) );

			return $rules;
		} );

		add_filter( 'wl_mappings_register_properties', function ( $properties ) use ( $manual_properties ) {
			$properties = array_merge( $properties, $manual_properties );

			return $properties;
		} );

		// Get the json ld data for this post.
		$jsonlds       = $this->jsonld_service->get_jsonld( false, $post_id );
		$target_jsonld = end( $jsonlds );
		$this->assertArrayHasKey( '@type', $target_jsonld );
		$this->assertEquals( 'HowTo', $target_jsonld['@type'] );
	}


	public function test_registering_mapping_with_transformation_function_should_work() {
		$post_id = $this->factory()->post->create( array() );
		wp_add_object_terms( $post_id, 'how-to', 'category' );
		// create filters
		$transformation_function = new Test_Transform_function();
		$manual_properties       = array(
			array(
				'property_name'      => '@type',
				'field_type'         => 'text',
				'field_name'         => 'HowTo',
				'transform_function' => $transformation_function->get_name(),
				'property_status'    => Mappings_Validator::ACTIVE_CATEGORY,
				'mapping_id'         => 'foo'
			),
		);

		$mapping_id = 'foo';

		add_filter( 'wl_mappings_register_mappings', function ( $mappings ) use ( $mapping_id ) {
			array_push( $mappings, array(
				'mapping_id'     => $mapping_id,
				'mapping_title'  => 'foo title',
				'mapping_status' => 'active'
			) );

			return $mappings;
		} );

		add_filter( 'wl_mappings_register_rule_groups', function ( $rule_groups ) use ( $mapping_id ) {
			array_push( $rule_groups, array(
				'rule_group_id' => 'rg_recipe_1',
				'mapping_id'    => $mapping_id
			) );

			return $rule_groups;
		} );

		add_filter( 'wl_mappings_register_rules', function ( $rules ) {
			array_push( $rules, array(
				'rule_field_one'   => 'category',
				'rule_logic_field' => '===',
				'rule_field_two'   => 'how-to',
				'rule_group_id'    => 'rg_recipe_1',
			) );

			return $rules;
		} );

		add_filter( 'wl_mappings_register_properties', function ( $properties ) use ( $manual_properties ) {
			$properties = array_merge( $properties, $manual_properties );

			return $properties;
		} );

		// Get the json ld data for this post.
		$jsonlds = $this->jsonld_service->get_jsonld( false, $post_id );
		$target_jsonld = end( $jsonlds );
		$this->assertEquals( "foo", $target_jsonld['@type'] );
	}

}