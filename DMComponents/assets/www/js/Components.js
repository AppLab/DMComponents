package com.dmengine.component

// This is a custom method for making a dashboard:
var GridView = function(args)
{	
	var totalItems = args.cells.length;
	var maxBtnsPerPane = args.cols * args.rows;
	var noPanes = Math.ceil(totalItems / maxBtnsPerPane);
	var panes = [];
	var cellIndex = 0;
	var showIndicator;

	// Create the panes:
	for(var i = 0; i < noPanes; i++)
	{
		panes[i] = new Ext.Panel({
			title: 'Dashboard' + (i + 1),
			layout: { type: 'vbox', align: 'stretch' },
			pack: 'center',
			defaults: { flex: 1 }
		});
		
		var thisCount = i + maxBtnsPerPane;
		
		// Loop through how many rows we need:
		for(var rowCount = 0; rowCount < args.rows; rowCount++)
		{
			var thisRow = new Ext.Panel({ layout: { type: 'hbox', align: 'stretch', pack: 'center' }, id: 'row' + (rowCount + 1), defaults: { flex: 1 } });
			
			// Now we need to add the cells:
			for(var colCount = 0; colCount < args.cols; colCount++)
			{
				var cellLabel, handlerFunc;
				
				(cellIndex > (totalItems - 1)) ? cellLabel = '' : cellLabel = args.cells[cellIndex].label;
				
				if(cellIndex < totalItems)
				{
					var thisCell = new Ext.Panel({
						title: args.cells[cellIndex].label,
						cls: 'dashboardButton',
						layout: { type: 'vbox', align: 'center', pack: 'center' },
						id: args.cells[cellIndex].id,
						items: [{ html: args.tpl.replace(/\{(\w+)\}/g, function(match, key) { return args.cells[cellIndex][key]; }) }],
						listeners: { tap: { element: 'el', fn: function() { rootPanel.setActiveItem(screens[this.id], { type: 'slide' } ); } } }
					});
				}
				else
					var thisCell = new Ext.Panel({ title: '' })
				
				thisRow.add(thisCell);
				cellIndex++;
			}
			panes[i].add(thisRow);
		}
	}
	
	(noPanes == 1) ? showIndicator = false : showIndicator = true;
		
	var gridview = new Ext.Carousel({
		title: args.title,
		items: panes,
		indicator: showIndicator
	});
	
	return gridview;
};

