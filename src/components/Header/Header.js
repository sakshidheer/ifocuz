import classes from './Header.module.css';
import { Icon } from '@iconify/react';
import listIcon from '@iconify-icons/bi/list';

const Header = (props) => {
    return <div className={classes.header}>
        <Icon height='30px' icon={listIcon} onClick ={props.onListIconClick}/>
    </div>
}

export default Header;