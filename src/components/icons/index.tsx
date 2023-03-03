import { SvgIconProps } from '@mui/material'

import { ReactComponent as EthereumSvg } from './ethereum.svg'
import { ReactComponent as LoaderSvg } from './loader.svg'
import { ReactComponent as LogoSvg } from './logo.svg'
import { ReactComponent as MetamaskSvg } from './metamask.svg'
import { ReactComponent as PolygonSvg } from './polygon.svg'
import { ReactComponent as WalletConnectSvg } from './wallet-connect.svg'

export function LogoIcon(props: SvgIconProps): React.ReactElement {
  return <LogoSvg {...props} />
}

export function MetamaskIcon(props: SvgIconProps): React.ReactElement {
  return <MetamaskSvg {...props} />
}

export function WalletConnectIcon(props: SvgIconProps): React.ReactElement {
  return <WalletConnectSvg {...props} />
}

export function EthereumIcon(props: SvgIconProps): React.ReactElement {
  return <EthereumSvg {...props} />
}

export function PolygonIcon(props: SvgIconProps): React.ReactElement {
  return <PolygonSvg {...props} />
}

export function LoaderIcon(props: SvgIconProps): React.ReactElement {
  return <LoaderSvg {...props} />
}
