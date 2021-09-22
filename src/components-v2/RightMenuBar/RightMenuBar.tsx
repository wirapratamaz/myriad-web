import {ChatAlt2Icon, HashtagIcon, VariableIcon} from '@heroicons/react/outline';

import React, {useState} from 'react';

import {RightMenuBarProps} from '.';
import {ExperienceTabMenu} from '../ExperienceTabMenu/ExperienceTabMenu';
import {TabsComponent} from '../atoms/Tabs/';

export const RightMenuBar: React.FC<RightMenuBarProps> = props => {
  const {experiences} = props;
  const [iconTabs] = useState([
    {
      id: 'first',
      icon: <VariableIcon />,
      component: <ExperienceTabMenu experiences={experiences} />,
    },
    {
      id: 'second',
      icon: <HashtagIcon />,
      component: 'Second Tab Content',
    },
    {
      id: 'third',
      icon: <ChatAlt2Icon />,
      component: 'Third Tab Content',
    },
  ]);

  const handleChangeTab = () => {
    console.log('changed tab!');
  };

  return (
    <div>
      <TabsComponent
        active={iconTabs[0].id}
        tabs={iconTabs}
        position={'left'}
        mark="cover"
        size="small"
        onChangeTab={handleChangeTab}
      />
    </div>
  );
};