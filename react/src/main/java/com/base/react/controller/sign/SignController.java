package com.base.react.controller.sign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base.react.model.ResponseVO;
import com.base.react.model.sign.SignDTO;
import com.base.react.service.sign.SignService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sign")
@Slf4j
public class SignController {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final SignService signService;

	@PostMapping("/signIn")
	public ResponseEntity<ResponseVO> signIn(@RequestBody SignDTO signDTO) {
		return ResponseEntity.ok(signService.signIn(signDTO));
	}

	@PostMapping("/signOut")
	public ResponseEntity<ResponseVO> signOut() {
		return ResponseEntity.ok(signService.signOut());
	}

	@GetMapping("/tokenCheck")
	public ResponseEntity<ResponseVO> tokenCheck(@RequestHeader(name="x-session-token", required = false) String accessToken) {
		return ResponseEntity.ok(signService.tokenCheck(accessToken));
	}

}
