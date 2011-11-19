/* Author: @buritica && @andresbarreto
for @termsheetcalc
*/

var app = {
	inputs: {
		preMoney: 0,
		commonStock:0,
		optionPool: 0,
		investment: 0,
	},
	outputs: {
		postMoney: 0,
		postShares: 0,
		pricePerShare: 0,
		commonOwnership: 0,
		preferredOwnership: 0,
		effectivePreMoney: 0,
	}
}

app.calculate = function(){
	if(!app.getInputs()){
		return false;
	}
	var inp = app.inputs;
	var out = app.outputs;
	
	//operate over values
	out.postMoney = inp.preMoney + inp.investment;
	out.pricePerShare = (inp.preMoney - (out.postMoney * inp.optionPool)) / inp.commonStock;
	out.preferredOwnership = (inp.investment / (inp.preMoney + inp.investment ));
	out.commonOwnership = 1 - out.preferredOwnership - inp.optionPool;
	out.effectivePreMoney = out.pricePerShare * inp.commonStock;

	console.log('post money: ' + out.postMoney);
	console.log('pps: ' + out.pricePerShare.toFixed(2)) ;
	console.log('common own: ' + app.utils.toPercentage(out.commonOwnership).toFixed(2));
	console.log('preferred own: ' + app.utils.toPercentage(out.preferredOwnership).toFixed(2));
	console.log('effective premoney: ' + out.effectivePreMoney.toFixed(2));
	//return results
	
	app.showResults();
}

app.showResults = function(){
	$('#pricepershare').val(app.outputs.pricePerShare.toFixed(2));
	$('#postmoney').val(app.outputs.postMoney.toFixed(2));
	$('#optionpoolresults').val(app.utils.toPercentage(app.inputs.optionPool));
	$('#preferredowned').val(app.utils.toPercentage(app.outputs.preferredOwnership).toFixed(2));
	$('#commonowned').val(app.utils.toPercentage(app.outputs.commonOwnership).toFixed(2));
	$('#results').fadeIn();
	$('body').animate( {scrollTop: 200});
}

app.getInputs = function(){
	//grab values
	app.inputs.preMoney = parseInt($('#premoney').val());
	app.inputs.optionPool = parseFloat($('#optionpool').val()/100);
	app.inputs.investment = parseInt($('#investment').val());
	app.inputs.commonStock = parseInt($('#commonstock').val());
	
	if(isNaN(app.inputs.preMoney) || app.inputs.preMoney == 0){
		app.showError('Is your company worth something?');
		return false;
	}
	
	if(isNaN(app.inputs.investment) || app.inputs.investment == 0){
		app.showError('I\'m sure you\'re trying to raise some money');
		return false;
	}
	if(isNaN(app.inputs.optionPool)){
		app.showError('I can\'t work with your option pool');
		return false;
	}
	if(isNaN(app.inputs.commonStock) || app.inputs.commonStock == 0){
		app.showError('There\'s something wrong with your stock');
		return false;
	}
	
	return true;
}

app.showError = function(message){
	$('#error').html(message).fadeIn().delay(3000).fadeOut();
}

app.utils = {
	toPercentage : function(number){
		return number * 100;
	}
}

$('a').click(function(){
	if($(this).attr('data-link') == 'calculate'){
		app.calculate();
	}
	return false;
});


$(document).ready(function(){
	$('body').bind('touchmove', function(e){
		// e.preventDefault();
	});
})