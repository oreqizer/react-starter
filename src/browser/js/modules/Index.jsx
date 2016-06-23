import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { AppBar, FontIcon } from 'material-ui';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';
import injectTapEventPlugin from 'react-tap-event-plugin';

import intlProvider from '../../../universal/decorators/intlProvider';
import { toggleSidebar } from '../../../universal/modules/ui/uiDuck';

import Sidebar from './Sidebar';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const messages = defineMessages({
  title: {
    id: 'seo.title.index',
    defaultMessage: 'Index',
  },
  description: {
    id: 'seo.description.index',
    description: 'In EN, the "Teh" is intentional',
    defaultMessage: 'Teh best boilerplate',
  },
});

@intlProvider
@injectIntl
@connect(state => ({
  appName: state.config.appName,
}), { push, toggleSidebar })
export default class Index extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    appName: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  @autobind
  handleToggleDrawer() {
    this.props.toggleSidebar();
  }

  renderGithub() {
    return (
      <a href="https://github.com/oreqizer/reactizer" target="_blank" rel="noopener noreferrer">
        <FontIcon className="octocat" style={{ margin: 12 }} />
      </a>
    );
  }

  render() {
    const { intl, children, appName } = this.props;

    return (
      <div id="Index">
        <Helmet
          title={intl.formatMessage(messages.title)}
          titleTemplate={`%s | ${appName}`}
          meta={[
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: intl.formatMessage(messages.description) },
            { property: 'og:type', content: 'boilerplate' },
          ]}
        />
        <AppBar
          title={<span style={{ cursor: 'pointer' }}>{appName}</span>}
          iconElementRight={this.renderGithub()}
          onTitleTouchTap={() => this.props.push('/')}
          onLeftIconButtonTouchTap={this.handleToggleDrawer}
        />
        <Sidebar />
        <div id="container">
          {children}
        </div>
      </div>
    );
  }
}
