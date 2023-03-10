import { css, useTheme } from '@emotion/react'
import { Box, Button, Divider, List } from '@mui/material'
import { ReactElement } from 'react'

import { DappLoading } from '../../../components/DappLoading'
import { DappModal, DappModalHeader } from '../../../components/dappModal'
import { LogoIcon } from '../../../components/icons'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { connectors } from '../connectors'
import { useConnect } from '../hooks/useConnect'
import {
  setConnectWalletModalOpened,
  setError,
  setIsConnecting,
} from '../store/wallet.reducers'
import { selectWalletState } from '../store/wallet.selectors'
import { ProviderInfos } from '../store/wallet.store'
import { ConnectWalletItem } from './ConnectWalletItem'

export function ConnectWalletModal(): ReactElement {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { isModalOpened, error, choosenProvider, isConnecting } =
    useAppSelector(selectWalletState)
  const { connect: connectMetaMask } = useConnect(
    connectors.MetaMask.connector,
    connectors.MetaMask.hooks,
    'MetaMask',
  )
  const { connect: connectWalletConnect } = useConnect(
    connectors.WalletConnect.connector,
    connectors.WalletConnect.hooks,
    'WalletConnect',
  )
  const allowBack = !!error || isConnecting

  const styles = {
    dappLogo: css`
      width: 60px;
      height: 60px;
    `,
    wrapper: css`
      ${theme.cssMixins.colVCentered}
    `,
    list: css`
      width: 100%;
      margin-top: 5px;
    `,
    divider: css`
      margin-left: 16px;
      margin-right: 16px;
      border-color: rgb(0 0 0 / 8%);
    `,
    tryAgainButton: css`
      font-size: 1.3rem;
      margin-top: 30px;
    `,
    progress: css`
      margin-top: 50px;
    `,
  }

  const retryConnect = () => {
    dispatch(setError(undefined))
    dispatch(setIsConnecting(true))
    switch (choosenProvider) {
      case 'MetaMask':
        connectMetaMask()
        break

      case 'WalletConnect':
        connectWalletConnect()
        break

      default:
        break
    }
  }

  const handleCloseModal = () => {
    dispatch(setConnectWalletModalOpened(false))
    dispatch(setError(undefined))
    dispatch(setIsConnecting(false))
  }

  const onBack = () => {
    dispatch(setError(undefined))
    dispatch(setIsConnecting(false))
  }

  return (
    <Box>
      <DappModal
        isOpen={isModalOpened}
        overflowY='auto'
        onClose={handleCloseModal}
        width='435px'
        padding='30px 40px'
      >
        <DappModalHeader
          allowBack={allowBack}
          onBack={onBack}
          onClose={handleCloseModal}
          height={10}
        />
        {!allowBack && (
          <Box css={styles.wrapper}>
            <LogoIcon css={styles.dappLogo} />
            <Box mt={1} fontWeight={600} fontSize='1.3rem'>
              Connect Wallet
            </Box>
            <Box color='text.quaternary' fontSize='1.2rem'>
              To start using Dapp
            </Box>
            <List css={styles.list}>
              <ConnectWalletItem
                walletIcon={ProviderInfos.MetaMask.icon}
                walletName='MetaMask'
                handleConnect={connectMetaMask}
              />
              <Divider css={styles.divider} />
              <ConnectWalletItem
                walletIcon={ProviderInfos.WalletConnect.icon}
                walletName='Wallet Connect'
                handleConnect={connectWalletConnect}
              />
            </List>
          </Box>
        )}
        {!error && isConnecting && (
          <Box css={styles.wrapper}>
            <LogoIcon css={styles.dappLogo} />
            <Box mt={1} fontWeight={600} fontSize='1.3rem'>
              Connect Wallet
            </Box>
            <Box color='text.quaternary' fontSize='1.2rem'>
              You may need to click the extension.
            </Box>
            <Box css={styles.progress}>
              <DappLoading />
            </Box>
          </Box>
        )}
        {error && (
          <Box css={styles.wrapper}>
            <LogoIcon css={styles.dappLogo} />
            <Box mt={1} fontWeight={600} fontSize='1.3rem'>
              Error connecting
            </Box>
            <Box
              color='text.quaternary'
              fontSize='1rem'
              lineHeight='1rem'
              textAlign='center'
            >
              Connection attempt failed. Click try again to connect your wallet.
            </Box>
            <Button
              variant='contained'
              css={styles.tryAgainButton}
              fullWidth
              onClick={retryConnect}
              color='error'
            >
              Try Again
            </Button>
          </Box>
        )}
      </DappModal>
    </Box>
  )
}
