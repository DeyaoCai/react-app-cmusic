import makeActions from '../actions';
import $http from "./../http/http.js";
import { connect } from 'react-redux';
import Home from "./Home/Home.js";
$http.loginCellphone({phone: "16621079485", password: "a13789",})(res => {

})
const mapStateToProps = state => ({...state.cmusichome});

const mapDispatchToProps = dispatch => {
  const $actions = makeActions(dispatch);
  return{
    $actions,
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
