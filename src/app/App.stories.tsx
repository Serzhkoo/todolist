import React from 'react';
import { Meta, Story } from '@storybook/react';
import App, { AppPropsType } from './App';
import { BrowserRouterDecorator, ReduxStoreProviderDecorator } from '../stories/ReduxStoreProviderDecorator';

export default {
  title: 'AppWithRedux component',
  component: App,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]

} as Meta;

const Template: Story = (args: AppPropsType) => <App {...args}/>;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
  demo: true
};
