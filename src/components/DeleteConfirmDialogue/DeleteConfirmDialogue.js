import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteConfirmDialogue = (props) => {
    return (<Dialog
        open={props.open}
        onClose={props.onClose}
    >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Delete
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to proceed with delete?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus color="primary" onClick={props.onClose}>
                Cancel
            </Button>
            <Button color="primary" onClick={props.onDelete}>
                Delete
            </Button>
        </DialogActions>
    </Dialog>);
}

export default DeleteConfirmDialogue;