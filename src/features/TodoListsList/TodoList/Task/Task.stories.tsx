import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Task, TaskPropsType } from './Task';
import { ReduxStoreProviderDecorator } from '../../../../stories/ReduxStoreProviderDecorator';

export default {
    title: 'Task component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]

} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskExample = Template.bind({});
TaskExample.args = {
    todoListId: "todoListId1",

};
