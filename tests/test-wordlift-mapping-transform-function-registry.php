<?php
/**
 * Tests: Wordlift_Mapping_Transform_Function_Registry Test.
 *
 * This file contains the tests for the {@link Wordlift_Mapping_Transform_Function_Registry } class.
 *
 * @since   3.25.0
 * @package Wordlift
 */

/**
 * Define the test class.
 *
 * @since   3.25.0
 * @package Wordlift
 */

class Wordlift_Mock_Transformation_Function implements Wordlift_Mapping_Transform_Function {
	public function get_name() {
		return 'foo';
	}
	public function get_label() {
		return 'foo label';
	}
	public function transform_data( $data ) {
		return $data;
	}
}

class Wordlift_Mapping_Transform_Function_Registry_Test extends Wordlift_Unit_Test_Case {
    private static function add_transformation_function_to_hook()
    {
        // Emulating this from a external plugin, that plugin should add this to the hook.
        add_filter(
            'wordlift_sync_mappings_register_transformation_function',
            function ($transformation_functions) {
                array_push($transformation_functions, new Wordlift_Mock_Transformation_Function());
                return $transformation_functions;
            }
        );
    }

    public function setUp() {
		parent::setUp();
	}

	public function test_can_add_transformation_function_via_filter() {
        self::add_transformation_function_to_hook();
        // Check if the registry has this instance.
        $registry = new Wordlift_Mapping_Transform_Function_Registry();
        $transformation_function = $registry->get_transform_function( 'foo' );
        $this->assertNotNull( $transformation_function, 'Transformation function should be present' );
	}

    /**
     * If the plugin is loaded after wordlift, it should still load the transformation function.
     */
	public function test_if_the_plugin_is_activated_after_wl_should_have_tf() {
        $registry = new Wordlift_Mapping_Transform_Function_Registry();
        // Emulate loading transformation function plugin after wordlift.
        self::add_transformation_function_to_hook();
        $transformation_function = $registry->get_transform_function( 'foo' );
        $this->assertNotNull( $transformation_function, 'Transformation function should be present' );
        $this->assertEquals( 1, $registry->get_transform_function_count() );
    }

    /**
     * If the plugin tries to register the same transformation function multiple times, dont allow it.
     */
    public function test_can_prevent_duplication_of_transformation_function() {
        $registry = new Wordlift_Mapping_Transform_Function_Registry();
        // Emulate loading transformation function plugin after wordlift.
        self::add_transformation_function_to_hook();
        // Trying to duplicate the transformation function, registry should prevent this from happening.
        self::add_transformation_function_to_hook();
        $transformation_function = $registry->get_transform_function( 'foo' );
        $this->assertNotNull( $transformation_function, 'Transformation function should be present' );
        $this->assertEquals( 1, $registry->get_transform_function_count() );
    }
}