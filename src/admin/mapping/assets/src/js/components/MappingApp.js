import React from 'react';

import { Rules } from './Rules';
export const MappingContext = React.createContext();

export class MappingApp extends React.Component {
	constructor() {
		super();

		this.andButtonHandler = this.andButtonHandler.bind( this );
		this.deleteButtonHandler = this.deleteButtonHandler.bind( this );
		this.addRuleButtonHandler = this.addRuleButtonHandler.bind( this );

		this.state = {
			andButtonHandler: this.andButtonHandler,
			deleteButtonHandler: this.deleteButtonHandler,
			addRuleButtonHandler: this.addRuleButtonHandler,
			defaultRuleset: {
				objectType: {
					'post-category': 'Post Category',
					'post-taxonomy': 'Post Taxonomy',
					'post-archive': 'Post Archive',
				},
				relation: {
					'less-than': 'Less Than',
					'equal-to': 'Equal To',
					'more-than': 'More Than',
				},
				postType: {
					'post': 'Post',
					'books': 'Books',
					'literature': 'Literature',
				}
			},
			ruleset: [
				[
					{
						set: true,
						objectType: 'Post Category',
						relation: 'Equal To',
						postType: 'Post',
					},
					{
						set: true,
						objectType: 'Post Taxonomy',
						relation: 'Less Than',
						postType: 'Books',
					}
				],
				[
					{
						set: true,
						objectType: 'Post Archive',
						relation: 'More Than',
						postType: 'Literature',
					}
				]
			],
		}
	}

	andButtonHandler( event, setNumber ) {
		const updatedSubset = [
			...this.state.ruleset[ setNumber ],
			this.state.defaultRuleset,
		];

		let updatedSet = this.state.ruleset;
		updatedSet[ setNumber ] = updatedSubset;

		this.setState( {
			ruleset: updatedSet,
		} );
	}

	deleteButtonHandler( e, setNumber, rowNumber ) {
		let ruleset = this.state.ruleset;
		let subArrayAfterDeletion = ruleset[ setNumber ].filter( ( item, index ) => index !== rowNumber  );
		ruleset[ setNumber ] = subArrayAfterDeletion;

		this.setState( {
			ruleset: ruleset,
		} );
	}

	addRuleButtonHandler() {
		this.setState( {
			ruleset: [
				...this.state.ruleset,
				[ this.state.defaultRuleset ]
			]
		} );
	}

	render() {
		return (
			<MappingContext.Provider value={ this.state }>
				<Rules />
			</MappingContext.Provider>
		);
	}
}
