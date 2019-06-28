"use strict";

function UItitle() {
	const name = DAW.get.name() || "D.A.W";

	document.title = DAW.compositionNeedSave() ? `*${ name }` : name;
}
