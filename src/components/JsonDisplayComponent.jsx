/* eslint-disable */
import React from 'react'
import CodeMirror from 'react-codemirror'
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/edit/closebrackets')
require('codemirror/addon/fold/foldcode')
require('codemirror/addon/fold/foldgutter')
require('codemirror/addon/fold/foldgutter.css')
require('codemirror/addon/fold/brace-fold')
const JsonDisplayComponent = React.createClass({
	getInitialState(){
		return {
			code:'//codedfdf'
		}
	},
	updateCode(newValue){
		console.log("ASdf",newValue)
	},
	handleTest(){
		console.log(this.codeMirror.getCodeMirror().getLineHandle(1))
	},
	render(){
		var options = {
		   mode: "javascript",
		   lineNumbers: true,
		   lineWrapping: true,
		   extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
		   foldGutter: true,
		   gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		   autoCloseBrackets:true
		};
		return(
		<div style={{textAlign:'left'}}>
			<CodeMirror ref={(ref)=>{this.codeMirror = ref}} value={this.state.code} onChange={this.updateCode} options={options} />
		</div>)
	}
})

export default JsonDisplayComponent
