import { BufferGeometry } from 'three';
import { Brush } from './Brush.js';
import { ADDITION } from './constants.js';

export class Operation extends Brush {

	constructor( ...args ) {

		super( ...args );

		this.isOperation = true;
		this.operation = ADDITION;

		this._cachedGeometry = new BufferGeometry();
		this._cachedMaterials = null;
		this._previousOperation = null;
		this._previousSibling = null;
		this._nextSibling = null;

	}

	updateSiblings() {

		const parent = this.parent;
		if ( parent ) {

			const index = parent.children.indexOf( this );
			const prev = parent.children[ index - 1 ] || null;
			const next = parent.children[ index + 1 ] || null;
			this._previousSibling = prev;
			this._nextSibling = next;

		} else {

			this._previousSibling = null;
			this._nextSibling = null;

		}

	}

	isDirty() {

		const parent = this.parent;
		let prev = null;
		let next = null;

		if ( parent ) {

			const index = parent.children.indexOf( this );
			prev = parent.children[ index - 1 ] || null;
			next = parent.children[ index + 1 ] || null;

		}

		return this.operation !== this._previousOperation ||
			this._previousSibling !== prev ||
			this._nextSibling !== next ||
			super.isDirty();

	}

	insertBefore( brush ) {

		const parent = this.parent;
		const index = parent.children.indexOf( this );
		parent.children.splice( index, 0, brush );

		// TODO: throw event

	}

	insertAfter( brush ) {

		const parent = this.parent;
		const index = parent.children.indexOf( this );
		parent.children.splice( index + 1, 0, brush );

		// TODO: throw event

	}

}
