/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import { useRecoilValue } from 'recoil'
import { myInfoSelector } from '/@store/atom'
import Language from '/@components/common/Language'
import { useMutationCustom } from '/@hooks/common/useMutationCustom'
import useSignApi from '/@apis/common/useSignApi'


const Header = (props) => {
	const myInfo = useRecoilValue(myInfoSelector)

  const { signOut } = useSignApi()
  const { mutateAsync: fnSignOut } = useMutationCustom({
		mutationKey: 'signOut',
		mutationFn: signOut,
	})
	const { fnGoMain, fnGoSystemPage } = props

	return (
		<header className="header">
			<div className="header__inner">
				<div className="header-logo">
					<a className="header-logo__link" onClick={() => fnGoMain()}>Contents Management System</a>
				</div>
				<div className="header-menu">
					<div className="header-menu__inner">
						<div className="header-menu__usernm">
						&nbsp; &nbsp;
						{/* <button type="button" className="login-button" onClick={() => goMenu1()}>/menu1/menu1 로</button>
						&nbsp; | &nbsp;
						<button type="button" className="login-button" onClick={() => goSignIn()}>/signIn 으로</button> */}
						{ myInfo && myInfo.userNm &&
							<>
								안녕하세요. <span className="name">{ myInfo.userNm }</span>님,
							</>
						}
						</div>
						<div className="mr-10">
							<Language />
						</div>
						<div className="header-menu__item header-menu__setting">
							<a className="header-menu__link" onClick={() => fnGoSystemPage()}></a>
						</div>
						<div className="header-menu__item header-menu__logout">
							<a href="#" className="header-menu__link" onClick={() => fnSignOut()}></a>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header