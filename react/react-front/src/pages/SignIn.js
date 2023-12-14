import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import sha512 from 'js-sha512'
import { useTranslation } from 'react-i18next'

import useSignApi from '/@apis/common/useSignApi'
import { useMutationCustom } from '/@hooks/common/useMutationCustom'
import useInputs from '/@hooks/common/useInputs'
import useModal from '/@hooks/common/useModal'
import Language from '/@components/common/Language'

import { useSetRecoilState } from 'recoil'
import { menuTabList } from '/@store/atom'

const SignIn = () => {
	const navigate = useNavigate()
	const setMenuTabList = useSetRecoilState(menuTabList)
	const { fnAlertOpen } = useModal()
	const { t } = useTranslation(['common'])
	const { params, fnInputChange } = useInputs({
		userId: 'test',
		userPw: 'test',
	})
	
	const { signIn } = useSignApi()
	const {
		mutateAsync: fnSignIn
	} = useMutationCustom({
		mutationKey: 'signIn',
		mutationFn: signIn,
		params: {...params, userPw: sha512(params.userPw)}
	})


	const fnSigninEvent = () => {
		if (params.userId === '' || params.userPw === '') {
			fnAlertOpen({
				message: t('common.message.login_input_required_msg')
			})
			return
		}

		fnSignIn()
	}

	const fnSigninTemp = async () => {
		navigate('/main')
	}

	useEffect(() => {
		setMenuTabList([])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="wrap wrap-common">
			<div className="ui-layout ui-layout__common">
				<div className="ui-layout__inner">
					<div className="login">
						<div className="login__inner">
							<div className="login-box">
								<div className="login-text">{t('common.message.login_required_msg')}</div>
								<div className="login-input">
									<div className="cell-col">
										<div className="ui-form form-input">
											<input type="text"
												className="ui-input ui-input__login"
												name="userId"
												value={params.userId}
												onChange={fnInputChange}
												placeholder="E-Mail"
											/>
										</div>
									</div>
									<div className="cell-col">
										<div className="ui-form form-input">
											<input type="password"
												className="ui-input ui-input__login"
												name="userPw"
												value={params.userPw}
												onChange={fnInputChange}
												placeholder="Password"
											/>
										</div>
									</div>

									<div className="d-flex-between mt-10">
										<div className="save-id">
											<input type="checkbox" id="switch" defaultChecked />
											<label htmlFor="switch" className="switch_label">
													<span className="onf_btn"></span>
											</label>
											<span className="save-id__text">아이디 저장</span>
										</div>
										<Language />
									</div>

									<div className="login-button__wrap">
										<button type="button" className="login-button" onClick={fnSigninEvent}>로그인</button>
									</div>

									<div className="login-button__wrap">
										<button type="button" className="login-button" onClick={fnSigninTemp}>/main 으로</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignIn