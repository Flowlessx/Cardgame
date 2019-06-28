"use strict";

gsuiSpectrum.draw = function( ctx, data ) {
	const datalen = data.length,
		img = ctx.createImageData( datalen, 1 ),
		imgData = img.data;

	for ( let i = 0; i < datalen; ++i ) {
		const x = i * 4,
			datum = 1 - Math.cos( data[ i ] / 255 * Math.PI / 2 );

		if ( datum < .05 ) {
			imgData[ x     ] = 4 + 10 * datum | 0;
			imgData[ x + 1 ] = 4 + 10 * datum | 0;
			imgData[ x + 2 ] = 5 + 20 * datum | 0;
		} else {
			const colId = gsuiSpectrum._datumDivision.findIndex( x => datum < x ),
				col = gsuiSpectrum.colors[ colId ],
				datumCut = datum / col[ 3 ];

			imgData[ x     ] = col[ 0 ] * datumCut | 0;
			imgData[ x + 1 ] = col[ 1 ] * datumCut | 0;
			imgData[ x + 2 ] = col[ 2 ] * datumCut | 0;
		}
		imgData[ x + 3 ] = 255;
	}
	return img;
};

gsuiSpectrum._datumDivision = [ .08, .15, .17, .25, .3, .4, .6, .8, Infinity ];
gsuiSpectrum.colors = [
	[   5,   2,  20, .08 ], // 0
	[   8,   5,  30, .15 ], // 1
	[  15,   7,  50, .17 ], // 2
	[  75,   7,  35, .25 ],   // 3
	[  80,   0,   0, .3  ],   // 4
	[ 180,   0,   0, .4  ],   // 5
	[ 200,  25,  10, .6  ], // 6
	[ 200, 128,  10, .8  ], // 7
	[ 200, 200,  20, 1   ], // 8
];
