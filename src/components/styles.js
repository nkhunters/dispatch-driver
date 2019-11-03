import commonColor from "./commonColor";
const React = require("react-native");

const {Dimensions} = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
	iosHeader: {
		backgroundColor: "#fff"
	},
	logoStyle:{
		height:71,
		width:290
	},
	iosLogoContainer: {
		top: deviceHeight /8,
		alignItems: "center",
		height:deviceHeight/4,
		flex:0.2
	},
	aLogoContainer: {
		top: deviceHeight / 8,
		alignItems: "center",
		height: deviceHeight / 4.5,
		flex:0.2
	},
	aHeader: {
		backgroundColor: "#fff",
		borderColor: "#aaa",
		elevation: 3,
		paddingTop:30
	},
	iosHeaderTitle: {
		fontSize: 18,
		fontWeight: "500",
		color: commonColor.brandPrimary
	},
	aHeaderTitle: {
		fontSize: 18,
		fontWeight: "500",
		lineHeight: 26,
		marginTop: -5,
		color: commonColor.brandPrimary
	},
	orText: {
		textAlign: "center",
		fontWeight: "700",
		color: "#fff"
	},
	regBtnContain: {
		justifyContent:'flex-end'
	},
	fieldStyle:{
		backgroundColor:"#fff",
		paddingLeft:10,
		paddingRight:10,
		position:"relative",
		borderRadius:20,
		paddingTop:5,
		paddingBottom:5,
		paddingRight:10,
		paddingLeft:10,
		borderColor:"#fff",
		maxWidth:290
	},
	autocompleteContainer:{
		borderWidth:0
	},
	fieldStyleRoom:{
		backgroundColor:"#fff",
		paddingLeft:10,
		paddingRight:10,
		position:"relative",
		borderRadius:20,
		width:deviceWidth-200,
		paddingTop:5,
		paddingBottom:5,
		paddingRight:10,
		paddingLeft:10,
		borderColor:"#fff",
		zIndex:1,
		maxWidth:190
	},
	container: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: commonColor.brandPrimary,
		zIndex:-1
	},
	triangleCorner: {
		position: 'absolute',
		top:0,
		left:0,
		width: deviceWidth,
		height: deviceHeight,
		backgroundColor: commonColor.brandPrimary,
		borderStyle: 'solid',
		borderRightWidth: deviceWidth,
		borderTopWidth: (deviceHeight<=568)?70:120,
		borderRightColor: '#16BCF8',
		borderTopColor: 'transparent',
	},
	errorStyle:{
		color:"#fff",
		bottom:-20,
		left:10,
		position:"absolute",
	},
	fieldViewStyle:{
		paddingLeft: 50,
		paddingRight:50,
		paddingBottom:15,
	},
	fieldViewLowerStyle:{
		paddingLeft: 20,
		paddingRight: 20,
		height: 50,
		backgroundColor: "white",
		marginHorizontal: 50,
		marginVertical: 10,
		borderRadius: 10,
		flexDirection: "row",
		zIndex:-1
	},
	fieldViewStyleLogin:{
		paddingLeft: 20,
		paddingRight: 20,
		height: 50,
		backgroundColor: "white",
		marginHorizontal: 50,
		marginVertical: 10,
		borderRadius: 10,
		flexDirection: "row"
	},
	problemText:{
		color: "#fff",
		fontSize:18,
		opacity:0.6,
		fontWeight:"400",
		alignSelf:"center",
		marginTop:5,
		marginBottom:20
	},
	regBtn: {
		backgroundColor: "#0091C6",
		borderColor:"#0091C6",
		borderWidth:2,
		height:60,
	},
	googleLeft: {
		flex: 1,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#B6382C",
		borderBottomLeftRadius: 4,
		borderTopLeftRadius: 4
	},
	fbLeft: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		backgroundColor: "#233772",
		borderBottomLeftRadius: 4,
		borderTopLeftRadius: 4
	},
	headingViewStyle:{
		paddingLeft: (deviceWidth-100)/4.5,
		paddingRight:(deviceWidth-100)/4.5,
		marginBottom:15
	},
	headingTextStyle:{
		color:"#fff",
		fontSize:30,
		fontWeight:"bold"
	},
	loginViewStyle:{
		flex:0
	},
	autoCompleteStyle:{
		fontSize:17,
		paddingLeft:20,
		paddingRight:20,
		paddingTop:15,
		paddingBottom:15,
		height:62,
		borderColor:"#fff",
		borderRadius:20,
		backgroundColor:"#fff"
	},
	autoCompleteContainerStyle:{
		borderWidth:0,
		borderRadius:20,
		backgroundColor:"transparent"
	},
	autoCompleteInputConatiner:{
		borderColor:"transparent",
		borderWidth:0
	},
	autoCompleteListContainer:{
		zIndex:9,
		top:-15,
		width:"100%",
		left:0,
		borderWidth:0
	},
	autoCompleteListStyle:{
		backgroundColor:"#fff",
		borderTopColor:"#fff",
		borderLeftColor:"#f1f1f1",
		borderRightColor:"#f1f1f1",
		borderBottomColor:"#f1f1f1",
		paddingLeft:10,
		paddingRight:10,
		maxHeight:80,
		overflow:"scroll"
	}
};
