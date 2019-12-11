/**
 * PropertyComponent : used to display a individual property, has 2 states
 * allow the user to edit it and add a new property
 * @author Naveen Muthusamy <naveen@wordlift.io>
 * @since 3.24.0
 */

import React from 'react'
import PropTypes from 'prop-types';

 class PropertyComponent extends React.Component {
     constructor (props) {
         super(props)
     }
     state = {
         propData: ( this.props.propData !== undefined ? 
            this.props.propData : "")
     }
     handlePropertyTextChange = (value) => {
        this.setState((prevState) => ({
            propData: {
                ...prevState.propData,
                propertyHelpText: value
            }
        }))
     }
     render() {
         return (
            <React.Fragment>
                    <a className="row-title">
                       { this.state.propData.propertyHelpText }
                    </a>
                    <br />
                    <table className="wl-container wl-container-full wl-spaced-table wl-property-edit-item">
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    Property Help Text
                                </td>
                                <td>
                                    <input type="text"
                                    placeholder="Telephone"
                                    className="wl-form-control wl-property-help-text"
                                    value={this.state.propData.propertyHelpText}
                                    onChange={event=> this.handlePropertyTextChange(event.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    Field Type Help Text
                                </td>
                                <td>
                                    <select className="wl-form-select">
                                        <option value="-1">Custom Field</option>
                                    </select> 
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    Field Help Text
                                </td>
                                <td>
                                    <input type="text" placeholder="Contact Form" className="wl-form-control" />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                Transform Help Text
                                </td>
                                <td>
                                    <select className="wl-form-select">
                                        <option value="-1">None</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"></td>
                                <td>
                                    <button className="wl-close-mapping button action bg-primary text-white"
                                    onClick={()=> this.props.switchState(this.props.propertyIndex, this.state.propData)}>
                                        Close Mapping
                                    </button>
                                </td>
                            </tr>
                    </tbody></table>
            </React.Fragment>
        )
     }
 }

 // supply a property object as data
 PropertyComponent.propTypes = {
     propertyData: PropTypes.object
 }

 export default PropertyComponent