import classes from './Header.module.css';
import { Icon } from '@iconify/react';
import listIcon from '@iconify-icons/bi/list';
import settingsSolid from '@iconify-icons/clarity/settings-solid';

const Header = (props) => {
    return <div className={classes.header}>
        <Icon height='30px' icon={listIcon} onClick ={props.onListIconClick}/>
        <Icon icon={settingsSolid} />
    </div>
}

export default Header;