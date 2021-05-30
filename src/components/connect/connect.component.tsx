import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { FacebookShareButton, RedditShareButton, TwitterShareButton } from 'react-share';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import RedditIcon from '@material-ui/icons/Reddit';
import TwitterIcon from '@material-ui/icons/Twitter';

import { useStyles } from './conntect.style';

import ShowIf from 'src/components/common/show-if.component';
import { SocialsEnum } from 'src/interfaces';

export type ConnectComponentRefProps = {
  openConnectForm: (social: SocialsEnum) => void;
};

type ConnectComponentProps = {
  publicKey: string;
  verify: (social: SocialsEnum, socialName: string) => void;
};

const prefix: Record<SocialsEnum, string> = {
  [SocialsEnum.TWITTER]: 'https://twitter.com/',
  [SocialsEnum.FACEBOOK]: 'https://www.facebook.com/',
  [SocialsEnum.REDDIT]: 'https://www.reddit.com/user/'
};

export const ConnectComponent = forwardRef(({ publicKey, verify }: ConnectComponentProps, ref: React.Ref<ConnectComponentRefProps>) => {
  const styles = useStyles();

  const [open, setOpen] = useState(false);
  const [social, setSocial] = useState<SocialsEnum | null>(null);
  const [socialName, setSocialName] = useState('');
  const [shared, setShared] = useState(false);

  const message = `I'm part of the Myriad ${publicKey}`;
  const APP_URL = 'https://app.myriad.systems';

  useImperativeHandle(
    ref,
    () => ({
      openConnectForm(social: SocialsEnum) {
        setSocial(social);
        setOpen(true);
        setShared(false);
        setSocialName('');
      }
    }),
    [social]
  );

  const handleSocialNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const name = text.substring(text.lastIndexOf('/') + 1);

    setSocialName(name);
  };

  const handleSocialNamePasted = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('Text');
    const name = text.substring(text.lastIndexOf('/') + 1);

    setSocialName(name);
  };

  const onShareClosed = () => {
    setShared(true);
  };

  const handleShared = () => {
    if (social && socialName) {
      console.log('HERE');
      verify(social, socialName);
      close();
    }
  };

  const close = () => {
    setOpen(false);
  };

  if (!social) return null;

  return (
    <div>
      <Dialog open={open} maxWidth="md" onClose={close} aria-labelledby="link-social-accounts-window">
        <DialogTitle id="connect-social">Link Your {social} Account</DialogTitle>
        <DialogContent dividers>
          <List component="div" aria-label="connect social steps">
            <ListItem button>
              <ListItemIcon>
                <Avatar className={styles.icon}>1</Avatar>
              </ListItemIcon>
              <ListItemText disableTypography>
                <Typography variant="caption">Your Twitter Account</Typography>
                <TextField
                  className={styles.account}
                  hiddenLabel
                  value={socialName}
                  onChange={handleSocialNameChange}
                  onPaste={handleSocialNamePasted}
                  color="secondary"
                  margin="dense"
                  required
                  fullWidth
                  name="username"
                  type="text"
                  id="username"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{prefix[social]}</InputAdornment>
                  }}
                />
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Avatar className={styles.icon}>2</Avatar>
              </ListItemIcon>
              <ListItemText disableTypography>
                <Typography variant="caption">Post it to your Twitter timeline</Typography>
                <TextField
                  disabled
                  margin="dense"
                  className={styles.message}
                  multiline
                  variant="outlined"
                  rows={6}
                  fullWidth={true}
                  value={message}
                />
              </ListItemText>
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <Avatar className={styles.icon}>3</Avatar>
              </ListItemIcon>
              <ListItemText disableTypography>
                <Typography variant="caption">Post it to your Twitter timeline</Typography>
                <div className={styles.linkAction}>
                  <ShowIf condition={social === SocialsEnum.FACEBOOK}>
                    <FacebookShareButton url={APP_URL} quote={message} onShareWindowClose={onShareClosed}>
                      <Button variant="contained" size="large" startIcon={<FacebookIcon />} className={styles.facebook}>
                        Share
                      </Button>
                    </FacebookShareButton>
                  </ShowIf>

                  <ShowIf condition={social === SocialsEnum.TWITTER}>
                    <TwitterShareButton url={APP_URL} title={message} onShareWindowClose={onShareClosed}>
                      <Button variant="contained" size="large" startIcon={<TwitterIcon />} className={styles.twitter}>
                        Share
                      </Button>
                    </TwitterShareButton>
                  </ShowIf>

                  <ShowIf condition={social === SocialsEnum.REDDIT}>
                    <RedditShareButton url={APP_URL} title={message} onShareWindowClose={onShareClosed}>
                      <Button variant="contained" size="large" startIcon={<RedditIcon />} className={styles.reddit}>
                        Share
                      </Button>
                    </RedditShareButton>
                  </ShowIf>
                </div>
              </ListItemText>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions className={styles.done}>
          <Button onClick={handleShared} disabled={!shared} size="medium" variant="contained" color="primary">
            Verified My Twitter Account
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
