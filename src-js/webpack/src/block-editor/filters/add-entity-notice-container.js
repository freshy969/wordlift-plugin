/**
 * External dependencies.
 */
import React from "react";
import { connect } from "react-redux";

/**
 * WordPress dependencies
 */
import { Notice } from "@wordpress/components";

const mapStateToProps = ({ showNotice }) => ({ showNotice });

const AddEntityNotice = ({ showNotice }) => (
  <div className="wl-notice">
    {showNotice && (
      <Notice status="success" isDismissible={false}>
        The entity was created!
      </Notice>
    )}
  </div>
);

export default connect(mapStateToProps)(AddEntityNotice);
