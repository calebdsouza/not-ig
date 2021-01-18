import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Paper, Button, Menu } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import MenuItems from './MenuItems';

import { APP_NAME } from '../../constants';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: between;
  justify-content: space-between;
  padding: 0 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19);
`;

const MenuButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppName = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

class Header extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (pathname) => {
    this.setState({ anchorEl: null });
    const history = this.props.history;
    console.log(history);
    if (history !== undefined) {
      history.push({ pathname });
    }
  };

  render() {
    return (
      <HeaderWrapper>
        <AppName>{APP_NAME}</AppName>

        <MenuButton>
          <Button
            variant="outlined"
            color="primary"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MenuIcon fontSize="large" />
          </Button>
        </MenuButton>

        <Menu
          id="AppMenu"
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={() => {
            this.setState({ anchorEl: null });
          }}
        >
          <Paper elevation={3} variant="outlined">
            <MenuItems handleClose={this.handleClose} />
          </Paper>
        </Menu>
      </HeaderWrapper>
    );
  }
}

export default withRouter(Header);
