import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import {RouteComponentProps} from "react-router";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    CssBaseline,
    Typography
} from "@material-ui/core";
import {LinkResponse} from './network/data';

const doLoaderTimeout: boolean = false;

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <CssBaseline/>
                <Container>

                    <Router basename={process.env.PUBLIC_URL}>
                        <Switch>
                            <Route exact path="/" component={NoWordPage}/>

                            <Route path="/word/:word/"
                                /* render={(props: RouteComponentProps<WordParams>) => {

                             return (
                                 <Typography>
                                     {props.match.params.word}
                                 </Typography>
                             );
                         }} word={null}*/
                                   component={WordPage}/>

                            {/*<Redirect to={`/`} />*/}

                            <Route component={NoWordPage}/> {/* Default location when none matches*/}
                        </Switch>


                    </Router>
                    {/*<header className="App-header">*/}
                    {/*  <img src={logo} className="App-logo" alt="logo"/>*/}
                    {/*  <p>*/}
                    {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
                    {/*  </p>*/}
                    {/*  <a*/}
                    {/*      className="App-link"*/}
                    {/*      href="https://reactjs.org"*/}
                    {/*      target="_blank"*/}
                    {/*      rel="noopener noreferrer"*/}
                    {/*  >*/}
                    {/*    Learn React*/}
                    {/*  </a>*/}
                    {/*</header>*/}
                </Container>
            </div>
        );
    }
}

interface WordPageParams {
    word: string
}

interface WordPageProps extends RouteComponentProps<WordPageParams> {

}

interface WordPageState {
    error: string
    link: LinkResponse
}

class WordPage extends Component<WordPageProps, WordPageState> {
    componentWillMount() {
        this.setState({})

        axios.get(`${process.env.PUBLIC_URL}/api/getWord/${this.props.match.params.word}`)
            .then(async result => {
                let response: LinkResponse = result.data

                if (doLoaderTimeout)
                    await new Promise(resolve => setTimeout(resolve, 1000))

                console.log(JSON.stringify(response))

                this.setState({
                    link: response
                })
            }).catch(async error => {
            if (doLoaderTimeout)
                await new Promise(resolve => setTimeout(resolve, 1000))

            console.log(error)

            this.setState({
                error: error
            })
        })
    }

    render() {

        if (this.state.error) {
            return (
                <Alert severity="error">
                    {this.state.error.toString()}
                </Alert>
            )
        } else {

            console.log(`Data: ${JSON.stringify(this.state)}`)

            return (
                <React.Fragment>
                    {
                        !this.state.link &&
                        (
                            <CircularProgress/>
                        )
                    }
                    <br/>


                    <Container>
                        <div
                            style={{
                                // width: '100%',
                                width: "auto",
                                height: "auto",
                                position: "relative"
                            }}>


                            <Card>

                                <CardContent>
                                    <Typography variant="h6">
                                        {
                                            this.props.match.params.word
                                        }
                                    </Typography>

                                </CardContent>


                                <CardActions>

                                    <Box flexGrow={1} alignItems="center" alignContent="center">
                                        <Box alignItems="center" p={1}>
                                            <Button variant="contained" disabled={!this.state.link}
                                                    href={this.state.link ? this.state.link.dictionaryLink : undefined}>
                                                Dictionary
                                            </Button>
                                        </Box>

                                        <Box p={1}>
                                            <Button variant="contained" disabled={!this.state.link}
                                                    href={this.state.link ? this.state.link.thesaurusLink : undefined}>
                                                Thesaurus
                                            </Button>
                                        </Box>
                                    </Box>

                                </CardActions>


                            </Card>
                            <div>
                                <Button
                                    color="primary"
                                    style={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8
                                    }} variant="contained" onClick={() => {
                                    this.props.history.push('/')
                                }}>
                                    New word
                                </Button>
                            </div>
                        </div>
                    </Container>


                </React.Fragment>
            );
        }
    }
}

interface NoWordPageState {
    error: string
}

class NoWordPage extends Component<RouteComponentProps, NoWordPageState> {

    componentWillMount() {
        this.setState({})

        refreshRandomWord(this.props, (error => {
            this.setState({
                error: error
            })
        }))
    }

    render() {
        if (this.state.error) {
            return (
                <Alert severity="error">
                    {this.state.error.toString()}
                </Alert>
            )
        } else {
            return (
                <CircularProgress/>
            );
        }
    }

}

function refreshRandomWord(props: RouteComponentProps, errorCallback: (error: any) => void) {
    axios.get(`${process.env.PUBLIC_URL}/api/randomWord`).then(async result => {
        let response = result.data

        if (doLoaderTimeout)
            await new Promise(resolve => setTimeout(resolve, 1000))

        props.history.push(`/word/${response}`)
    }).catch(async error => {
        if (doLoaderTimeout)
            await new Promise(resolve => setTimeout(resolve, 1000))

        errorCallback(error)
    })
}

export default App;
