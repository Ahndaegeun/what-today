package www.weather.com.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import www.weather.com.domain.entity.MemberDTO
import www.weather.com.service.inter.MemberService

@RestController
@RequestMapping("/access")
class AccessController(
    private val memberService: MemberService
) {
    @PostMapping("/signUp")
    fun signUp(member: MemberDTO) = memberService.signUp(member)
}