"use strict";

// .............................................................................
const cmpTpl = document.querySelector( "#component-template" );
cmpTpl.remove();
cmpTpl.removeAttribute( "id" );

function cmpUpdate( cmp, status, w, h ) {
	console.log( w, h );
	cmp.children[ 0 ].textContent = status;
	cmp.children[ 1 ].textContent = `w ${ w }`;
	cmp.children[ 2 ].textContent = `h ${ h }`;
}

// .............................................................................
const uiWindows = new gsuiWindows();
const winA = uiWindows.createWindow( "winA" );
const winB = uiWindows.createWindow( "winB" );
const cmpB = cmpTpl.cloneNode( true );

uiWindows.onclose = win => {
  console.log( "uiWindows.onclose", win );
};

winA.setIdAttr( "AAA" );
winA.setSize( 480, 360 );
winA.setPosition( 100, 100 );
winA.open();

winB.setIdAttr( "BBB" );
winB.onresize = ( w, h ) => cmpUpdate( cmpB, "resized", w, h );
winB.onresizing = ( w, h ) => cmpUpdate( cmpB, "resizing...", w, h );
winB.setPosition( 300, 300 );
winB.setSize( 480, 360 );
winB.open();
winB.append( cmpB );

// .............................................................................
window.onresize = () => {
	uiWindows.resized();
};

// .............................................................................
const lowGraphics = document.querySelector( "#lowGraphicsCheckbox" );

lowGraphics.onchange = () => {
	uiWindows.lowGraphics( lowGraphics.checked );
};
