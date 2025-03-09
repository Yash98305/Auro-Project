import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class PieChart extends Component {

	render() {
	const categories = 	this.props.categories
	
		const options = {
			animationEnabled: true,
			title: {
				text: "Categories"
			},
			subtitles: [{
				// text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: false,
				// indexLabel: "{name} : {y}",
				indexLabel: "{name}",
				yValueFormatString: "#,###'%'",
				dataPoints:
				categories?.length>0 && categories?.map(e=> {
					return {name:e.name,y:100,color:e.type=="expense"?"red":"green"}
				})
			}],

            
		}
		return (
		<div>
			<CanvasJSChart options = {options}/>
		</div>
		);
	}
}
export default PieChart;