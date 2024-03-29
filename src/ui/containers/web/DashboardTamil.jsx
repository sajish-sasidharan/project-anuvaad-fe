import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewOrders from '../../components/web/dashboard/NewOrders';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import APITransport from '../../../flux/actions/apitransport/apitransport';
import AutoML from "../../../flux/actions/apis/auto_ml";
import NMT from "../../../flux/actions/apis/nmt";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { white, blueGrey50,darkBlack } from "material-ui/styles/colors"
import Select from '../../components/web/common/Select';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      apiCalled: false,
      autoMlText: '',
      nmtText: [],
      nmtTextSP: [],
      tocken: false,
      source:'',
      target:'',
      model:'',
      sourceLanguage: ['English'],
      targetLanguage: ['Hindi','Tamil'],
    }
  }

  componentDidMount() {
    this.setState({
      autoMlText: '',
      nmtText: [],
      nmtTextSP: []
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.automl !== this.props.automl) {
      this.setState({
        autoMlText: this.props.automl.text,
      })
    }
    if (prevProps.nmt !== this.props.nmt) {
      this.setState({
        nmtText: this.props.nmt.text,
      })
    }
    if (prevProps.nmtsp !== this.props.nmtsp) {
      this.setState({
        nmtTextSP: this.props.nmtsp.text,
      })
    }
  }

  handleTextChange(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }
  handleClear() {
    console.log('clear')
    this.setState({
      text:'',
      autoMlText:'',
      source:'',
      target:''
    })
  }

  handleSelectChange = event => {
    
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit() {
    
    
    const { APITransport, NMTApi, NMTSPApi } = this.props;

    const apiObj = new AutoML(this.state.text, this.state.source, this.state.target);
    const nmt = new NMT(this.state.text, this.state.model, true,this.state.target);
    // const nmtsp = new NMTSP(this.state.text);
    this.setState({
      nmtText: [],
      nmtTextSP: []
    })
    APITransport(apiObj);
    NMTApi(nmt)
    // NMTSPApi(nmtsp)
    this.setState({
      apiCalled: true
    })
  }

  render() {
    return (
      <div>
        <Paper style={{marginLeft:'25%',width:'50%',marginTop:'5%'}}>
        <Typography variant="h5" style={{ color: darkBlack, background:blueGrey50, paddingLeft:'40%', paddingBottom:'12px',paddingTop:'8px'}} >Translator</Typography>
        <Grid container spacing={4} >
            <Grid item xs={8} sm={8} lg={8} xl={8}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '9.5%' }} >Please select source language :</Typography>
        
        </Grid>
        <Grid item xs={3} sm={3} lg={2} xl={2}><br/><br/>
            <Select id={"outlined-age-simple"} MenuItemValues={['English','Hindi','Tamil']} handleChange={this.handleSelectChange} value={this.state.source} name="source" style={{marginRight: '30%', marginBottom: '5%',marginTop: '4%'}} />
            </Grid>
            </Grid>

            <Grid container spacing={4} >
            <Grid item xs={8} sm={8} lg={8} xl={8}>
          <Typography value='' variant="title" gutterBottom="true" style={{ marginLeft: '12%', paddingTop: '9.5%' }} >Please select target language :</Typography>
        
        </Grid>
        <Grid item xs={3} sm={3} lg={2} xl={2}><br/><br/>
            <Select id={"outlined-age-simple"} MenuItemValues={this.state.source=='English'? this.state.targetLanguage: this.state.sourceLanguage} handleChange={this.handleSelectChange} value={this.state.target} name="target" style={{marginRight: '30%', marginBottom: '5%',marginTop: '4%'}} />
            </Grid>
            </Grid>
        <div style={{marginLeft:'40px'}}>
        <Grid container spacing={24} style={{ padding: 24 }}>
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <TextField
            value={this.state.text}
              id="standard-multiline-static"
              placeholder = "Enter Text Here ......"
              style={{ width: '96%' }}
              multiline
              marginLeft="normal"
              onChange={(event) => {
                this.handleTextChange('text', event)
              }}
            />
          </Grid>
          <Button variant="contained"  onClick={this.handleClear.bind(this)} color="primary" aria-label="edit" style={{marginLeft:'1.3%',width:'44%', marginBottom:'4%', marginTop:'4%',marginRight:'5%'}}>
                    Clear
                  </Button>
                <Button variant="contained" onClick={this.handleSubmit.bind(this)} color="primary" aria-label="edit" style={{width:'44%', marginBottom:'4%', marginTop:'4%'}}>
                    Submit
                  </Button>
               
          {/* <Grid item xs={9} sm={6} lg={2} xl={2}>
            
            <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)}>
              Submit
            </Button>
            </Grid>
            <Grid item xs={9} sm={6} lg={3} xl={3}>
            <Button variant="contained" color="primary" onClick={this.handleClear.bind(this)}>
              Clear
            </Button>
           
            </Grid> */}
        </Grid>
        </div>
        {this.state.autoMlText && this.state.nmtText &&
        <div>
        
          
            <NewOrders title="Google" data={[this.state.autoMlText]} />
          
          
            <NewOrders title="Anuvaad Model" data={this.state.nmtText} />
            </div>
        }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  apistatus: state.apistatus,
  automl: state.automl,
  nmt: state.nmt,
  nmtsp: state.nmtsp
});

const mapDispatchToProps = dispatch => bindActionCreators({
  APITransport,
  NMTApi: APITransport,
  NMTSPApi: APITransport,
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
