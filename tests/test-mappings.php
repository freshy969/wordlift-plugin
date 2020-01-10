<?php
/**
 * This file provides the test for the Mappings feature.
 *
 * @since 3.25.0
 * @package Wordlift
 * @subpackage Wordlift/tests
 */

class Wordlift_Mappings_Test extends Wordlift_Unit_Test_Case {

	private $jsonld_service;

	/**
	 * The {@link Wordlift_Mapping_Validator} instance to test.
	 *
	 * @since  3.25.0
	 * @access private
	 * @var \Wordlift_Mapping_Validator $validator The {@link Wordlift_Mapping_Validator} instance to test.
	 */
	private $validator;

	/**
	 * The {@link Wordlift_Mapping_DBO} instance to test.
	 *
	 * @since  3.25.0
	 * @access private
	 * @var \Wordlift_Mapping_DBO $dbo The {@link Wordlift_Mapping_DBO} instance to test.
	 */
	private $dbo;

	function setUp() {
		parent::setUp(); // TODO: Change the autogenerated stub
		// Initialize dependancies for the test.
		$this->dbo       = new Wordlift_Mapping_DBO();
		$this->validator = new Wordlift_Mapping_Validator();

		// Try to get the ACF PRO Key, if not set, skip this test.
		$acf_pro_key = getenv( 'ACF_PRO_KEY' );
		if ( empty( $acf_pro_key ) ) {
			$this->markTestSkipped( '`ACF_PRO_KEY` not set, test skipped.' );
		}

		// Load the WP Filesystem.
		$wp_filesystem = $this->load_wp_filesystem();
		$this->assertNotNull( $wp_filesystem, 'We require a $wp_filesystem.' );

		// Download the ACF PRO package.
		$acf_download_url = "https://connect.advancedcustomfields.com/index.php?a=download&p=pro&k=$acf_pro_key";
		$response         = wp_remote_get( $acf_download_url, array( 'timeout' => 60, ) );

		// Store the zip file to the plugin directory.
		$acf_destination_path = $wp_filesystem->wp_plugins_dir() . '/advanced-custom-fields-pro.zip';

		// Store the data locally.
		$body = wp_remote_retrieve_body( $response );
		$this->assertFalse( is_wp_error( $response ) || ! isset( $response['body'] ), 'An error occurred: ' . var_export( $response, true ) );
		$result_1 = $wp_filesystem->put_contents( $acf_destination_path, $body );
		$this->assertTrue( $result_1, "Unable to save ACF Pro to the local WordPress test install [ class name :: " . get_class( $wp_filesystem ) . " ][ url :: $acf_download_url ][ path :: $acf_destination_path ]." );

		// Unzip the plugin.
		$result_2 = unzip_file( $acf_destination_path, $wp_filesystem->wp_plugins_dir() );
		$this->assertNotWPError( $result_2, 'An error occurred: ' . var_export( $result_2, true ) );

		// Activate the plugin.
		$result_3 = activate_plugin( 'advanced-custom-fields-pro/acf.php' );
		$this->assertNotWPError( $result_3, 'An error occurred: ' . var_export( $result_3, true ) );

		// Add the How To taxonomy term.
		$result_4 = wp_insert_term( 'How To', 'category' );
		$this->assertNotWPError( $result_4, 'An error occurred: ' . var_export( $result_4, true ) );

		$this->jsonld_service = Wordlift_Jsonld_Service::get_instance();
		require( 'test-mappings.acf.php' );
	}

	/**
	 * Get a {@link WP_Filesystem_Direct} instance.
	 *
	 * @return WP_Filesystem_Direct The {@link WP_Filesystem_Direct} instance.
	 */
	private function load_wp_filesystem() {

		// Required for REST API calls
		if ( ! function_exists( 'WP_Filesystem' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/file.php' );
		}

		// Load `WP_Filesystem`, forcing the direct method.
		add_filter( 'filesystem_method', array( $this, '__return_direct' ) );
		WP_Filesystem();
		remove_filter( 'filesystem_method', array( $this, '__return_direct' ) );

		global $wp_filesystem;

		return $wp_filesystem;
	}

	/**
	 * Injects a new rule and create a mapping item.
	 * @param String $taxonomy The taxonomy like category.
	 * @param String $taxonomy_value The value of the taxonomy.
	 * @return void
	 */
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

	/**
	 * Always return `direct`. Useful to force the {@link WP_Filesystem} function to always return a
	 * {@link WP_Filesystem_Direct} instance.
	 *
	 * @return string Always `direct`.
	 */
	public function __return_direct() {

		return 'direct';
	}

	public function test_how_to_tool_mapping() {
		$max_tools = 5;
		$post_id  = $this->factory()->post->create();
		$result_1 = wp_add_object_terms( $post_id, 'how-to', 'category' );
		for ( $i = 1; $i <= $max_tools; $i ++ ) {
			$result = add_row( 'tool', array(
				'type' => 'HowToTool',
				'name' => "Tool $i"
			), $post_id );
			$this->assertNotFalse( $result, 'Must not be false.' );
		}
		$jsonlds = $this->jsonld_service->get_jsonld( false, $post_id );
		$mapping_converter_instance = new Wordlift_Mapping_Jsonld_Converter( $post_id, $jsonlds );
		$property_data_1 = array(
			'property_name' => 'tool',
			'field_type' => 'ACF',
			'field_name'          => 'tool',
			'transform_function'  => 'how_to_tool_transform_function',
			'property_status'     => Wordlift_Mapping_Validator::ACTIVE_CATEGORY,
		);

		$properties    = array(
			$property_data_1,
		);
		// Create a mapping item for category how_to.
		$this->create_new_mapping_item( 'category', (int) $result_1[0], $properties );	
		$jsonlds = $mapping_converter_instance->get_jsonld_data();
		$jsonld  = $jsonlds[0]['tool'][0];
		$this->assertEquals( $jsonld['@type'], 'HowToTool' );
		$this->assertArrayHasKey( 'name', $jsonld );
	}

	public function test_how_to_supply_mapping() {
		$max_steps = 5;
		$post_id  = $this->factory()->post->create();
		$result_1 = wp_add_object_terms( $post_id, 'how-to', 'category' );
		for ( $i = 1; $i <= $max_steps; $i ++ ) {
			$result = add_row( 'supply', array(
				'type' => 'HowToSupply',
				'name' => "Supply $i"
			), $post_id );
			$this->assertNotFalse( $result, 'Must not be false.' );
		}
		$jsonlds = $this->jsonld_service->get_jsonld( false, $post_id );
		$mapping_converter_instance = new Wordlift_Mapping_Jsonld_Converter( $post_id, $jsonlds );
		$property_data_1 = array(
			'property_name' => 'supply',
			'field_type' => 'ACF',
			'field_name'          => 'supply',
			'transform_function'  => 'how_to_supply_transform_function',
			'property_status'     => Wordlift_Mapping_Validator::ACTIVE_CATEGORY,
		);

		$properties    = array(
			$property_data_1,
		);
		// Create a mapping item for category how_to.
		$this->create_new_mapping_item( 'category', (int) $result_1[0], $properties );	
		$jsonlds = $mapping_converter_instance->get_jsonld_data();
		$jsonld  = $jsonlds[0]['supply'][0];
		$this->assertEquals( $jsonld['@type'], 'HowToSupply' );
		$this->assertArrayHasKey( 'name', $jsonld );
	}

	public function test_how_to_with_5_section() {
		// Create a post and assign it the How To category.
		$post_id  = $this->factory()->post->create();
		$result_1 = wp_add_object_terms( $post_id, 'how-to', 'category' );
		$max_steps = 5;
		for ( $i = 1; $i <= $max_steps; $i ++ ) {
			$result = add_row( 'step', array(
				'type' => 'HowToSection',
				'name'  => "Name $i",
				'section_item' => array(
					array(
						'step_name' => "Step Name $i",
						'step_text' => "Step Text $i",
					),
				),
			), $post_id );
			$this->assertNotFalse( $result, 'Must not be false.' );
		}


		$jsonlds = $this->jsonld_service->get_jsonld( false, $post_id );
		$mapping_converter_instance = new Wordlift_Mapping_Jsonld_Converter( $post_id, $jsonlds );

		$property_data_2 = array(
			'property_name'   => 'step',
			'field_type' => 'ACF',
			'field_name'      => 'step',
			'transform_function'  => 'how_to_step_transform_function',
			'property_status'      => Wordlift_Mapping_Validator::ACTIVE_CATEGORY,
		);
		$properties    = array(
			$property_data_2,
		);
		// Create a mapping item for category how_to.
		$this->create_new_mapping_item( 'category', (int) $result_1[0], $properties );

		$jsonlds = $mapping_converter_instance->get_jsonld_data();
		$jsonld  = $jsonlds[0];
		$single_step = $jsonld['step'][0];
		// Type of step should be HowToSection.
		$this->assertEquals( $single_step['@type'], 'HowToSection' );
		$this->assertArrayHasKey( 'itemListElement', $single_step );
		// A single step should have 1 section item in the array.
		$section_list = $single_step['itemListElement'];
		$this->assertCount( 1, $section_list );
	}

	public function test_how_to_with_5_steps() {

		// Add our custom fields.
		$this->assertTrue( function_exists( 'acf_add_local_field_group' ), '`acf_add_local_field_group` must exist.' );

		// Validate field group.
		$this->assertTrue( acf_is_local_field_group( 'group_5e09d8a05741b' ), 'Our ACF local group must exist.' );

		// Create a post and assign it the How To category.
		$post_id  = $this->factory()->post->create();
		$result_1 = wp_add_object_terms( $post_id, 'how-to', 'category' );
		$this->assertNotWPError( $result_1, 'An error occurred: ' . var_export( $result_1, true ) );

		// Check that the post is seen by ACF.
		$this->assertEquals( $post_id, acf_get_valid_post_id( $post_id ), '`acf_get_valid_post_id` should be true for post id: ' . $post_id );
		// Add 5 steps.
		$result_2 = update_field( 'step', array(), $post_id );
		$this->assertNotFalse( $result_2, 'Must not be false.' );
		$this->assertFalse( acf_is_field_key( 'step' ), 'We didn`t give a key.' );
		$this->assertNotFalse( acf_get_meta_field( 'step', $post_id ), '`acf_get_meta_field` shouldn`t be false.' );
		$this->assertNotFalse( acf_maybe_get_field( 'step', $post_id, false ), '`acf_maybe_get_field` must not be false.' );

		$max_steps = 5;
		for ( $i = 1; $i <= $max_steps; $i ++ ) {
			$result = add_row( 'step', array(
				'type' => 'HowToStep',
				'text' => "Step $i",
				'image' => "Image $i",
				'name'  => "Name $i",
			), $post_id );
			$this->assertNotFalse( $result, 'Must not be false.' );
		}
		// https://developers.google.com/search/docs/data-types/how-to

		$jsonlds = $this->jsonld_service->get_jsonld( false, $post_id );
		$mapping_converter_instance = new Wordlift_Mapping_Jsonld_Converter( $post_id, $jsonlds );

		$this->assertTrue( is_array( $jsonlds ), '`$jsonlds` must be an array.' );
		$this->assertCount( 1, $jsonlds, 'We must receive one JSON-LD.' );
		// Property for HowTo.
		$property_data_1 = array(
			'property_name' => '@type',
			'field_type' => 'text',
			'field_name'          => 'HowTo',
			'transform_function'  => 'text_transform_function',
			'property_status'     => Wordlift_Mapping_Validator::ACTIVE_CATEGORY,
		);
		$property_data_2 = array(
			'property_name'   => 'step',
			'field_type' => 'ACF',
			'field_name'      => 'step',
			'transform_function'  => 'how_to_step_transform_function',
			'property_status'      => Wordlift_Mapping_Validator::ACTIVE_CATEGORY,
		);
		$properties    = array(
			$property_data_1,
			$property_data_2,
		);
		// Create a mapping item for category how_to.
		$this->create_new_mapping_item( 'category', (int) $result_1[0], $properties );

		// Alter the json ld based on mappings.

		$jsonlds = $mapping_converter_instance->get_jsonld_data();
		$jsonld  = $jsonlds[0];
		$single_step = $jsonld['step'][0];

		$this->assertEquals( 'HowTo', $jsonld['@type'], '`@type` must be `HowTo`, found instead ' . $jsonld['@type'] );
		$this->assertCount( 5, $jsonld['step'] );
		$this->assertArrayHasKey( '@type', $single_step, '`@type` must be present for step' );
		$this->assertArrayHasKey( 'text', $single_step, '`text` must be present for step' );
		$this->assertArrayHasKey( 'name', $single_step, '`name` must be present for step' );
		$this->assertArrayHasKey( 'image', $single_step, '`image` must be present for step' );

	}

	public function test_how_to_step_with_step_items() {
		// Create a post and assign it the How To category.
		$post_id  = $this->factory()->post->create();
		$result_1 = wp_add_object_terms( $post_id, 'how-to', 'category' );
		$max_steps = 5;
		for ( $i = 1; $i <= $max_steps; $i ++ ) {
			$result = add_row( 'step', array(
				'type' => 'HowToStep',
				'name'  => "Name $i",
				'step_item' => array(
					array(
						'step_type' => "HowToDirection",
						'step_text' => "Step Text $i",
					),
				),
			), $post_id );
			$this->assertNotFalse( $result, 'Must not be false.' );
		}


		$jsonlds = $this->jsonld_service->get_jsonld( false, $post_id );
		$mapping_converter_instance = new Wordlift_Mapping_Jsonld_Converter( $post_id, $jsonlds );

		$property_data_2 = array(
			'property_name'   => 'step',
			'field_type' => 'ACF',
			'field_name'      => 'step',
			'transform_function'  => 'how_to_step_transform_function',
			'property_status'      => Wordlift_Mapping_Validator::ACTIVE_CATEGORY,
		);
		$properties    = array(
			$property_data_2,
		);
		// Create a mapping item for category how_to.
		$this->create_new_mapping_item( 'category', (int) $result_1[0], $properties );

		$jsonlds = $mapping_converter_instance->get_jsonld_data();
		$jsonld  = $jsonlds[0];
		$single_step = $jsonld['step'][0];
		// Type of step should be HowToSection.
		$this->assertEquals( $single_step['@type'], 'HowToStep' );
		$this->assertArrayHasKey( 'itemListElement', $single_step );
		// A single step should have 1 step item in the array.
		$step_list = $single_step['itemListElement'];
		$this->assertCount( 1, $step_list );
		$single_step_item = $step_list[0];
		$this->assertEquals( 'HowToDirection', $single_step_item['@type'] );
		$this->assertEquals( 'Step Text 1', $single_step_item['text'] );
	}
}