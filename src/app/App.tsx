import * as React from 'react'
import { Component } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import routes from '../routes'
import { connect } from 'react-redux'
import history from '../helpers/history'
// import { PrivateRoute } from '../components/authentication/privateRoute';
import IRoute from '../constants/common/route'
import { alertActions } from '../actions/alertActions'
import { IAppState } from '../constants/AppInterfaces'
import authenticationRedirection from '../helpers/authenticationRedirection'

/**
 * Composant représentant l'application du site.
 */
class App extends Component<any, {}> {
  constructor(props: any) {
    super(props)

    const { dispatch } = this.props
    history.listen(() => {
      //clear alert on location change
      dispatch(alertActions.clear)
    })

    authenticationRedirection(this.props.isAutoLogin, history)
  }

  public static displayName = 'App'

  public componentDidUpdate(prevProps: any) {
    console.log(
      'componentDidUpdate',
      prevProps.isAuthenticated,
      this.props.isAuthenticated
    )
    authenticationRedirection(this.props.isAuthenticated, history)
  }

  public render() {
    const { alert } = this.props
    return (
      <div className="App">
        {alert.message && (
          <div className={`alert ${alert.className}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <Switch>
            {routes.map((route, index) => this.renderRoute(route, index))}
          </Switch>
        </Router>
      </div>
    )
  }

  private renderRoute(route: IRoute, index: number) {
    // if (route.private === true) {
    //   return (<PrivateRoute key={index} {...route} />)
    // }

    return (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    )
  }
}

function mapStateToProps(state: IAppState) {
  // console.log(state);
  return {
    alert: state.alert,
    isAuthenticated: state.login.isAuthenticated,
    isAutoLogin: state.login.autoLogin,
  }
}

export default connect(mapStateToProps)(App)
