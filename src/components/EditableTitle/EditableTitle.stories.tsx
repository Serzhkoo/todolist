import React from 'react';
import { Story, Meta } from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {EditableTitle, EditableTitlePropsType} from "./EditableTitle";

export default {
    title: 'EditableTitle component',
    component: EditableTitle,

} as Meta;

const Template: Story<EditableTitlePropsType> = (args) => <EditableTitle {...args} />;

export const EditableTitleExample = Template.bind({});
EditableTitleExample.args = {
    title: "Some value",
    onChange: action("Value changed")
};
