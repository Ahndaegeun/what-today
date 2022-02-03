package www.weather.com.service.inter

import www.weather.com.domain.entity.MemberDTO

interface MemberService {
    fun signUp(member: MemberDTO)
}