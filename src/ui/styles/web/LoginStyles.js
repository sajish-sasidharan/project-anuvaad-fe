import { grey500, white } from 'material-ui/styles/colors';

const LoginStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  },
  loginContainer: {
    minWidth: '15%',
    maxWidth: '25%',

    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: '32%',
    
    
  },

  signUpContainer: {
    minWidth: '15%',
    maxWidth: '25%',

    height: 'auto',
    
    marginTop: '2%',
    marginLeft: '32%',
    
    
  },
  paper: {
    width:'100%',
    minWidth:'260px',
    paddingLeft: '20%',
    paddingRight: '20%',
    paddingTop:'3%',
    paddingBottom:'3%',
    overflow: 'auto',
    marginLeft:'0%'
  },
  paperSign: {
    width:'100%',
    paddingLeft: '20%',
    paddingRight: '20%',
    paddingTop:'3%',
    paddingBottom:'3%',
    overflow: 'auto',
    marginLeft:'0%',
    marginTop:'30%'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  loginBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnFacebook: {
    background: '#4f81e9'
  },
  btnGoogle: {
    background: '#e14441'
  },
  btnSpan: {
    marginLeft: 5
  }
});


export default LoginStyles;
