import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 1, 3),
      background: '#FFF',
      width: 580,
    },
    confirm: {
      marginTop: 60,
    },
    progress: {
      position: 'absolute',
      top: '50%',
      right: 30,
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);
