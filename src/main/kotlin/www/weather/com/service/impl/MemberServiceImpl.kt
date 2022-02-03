package www.weather.com.service.impl

import org.springframework.stereotype.Service
import www.weather.com.domain.entity.Member
import www.weather.com.domain.entity.MemberDTO
import www.weather.com.domain.repository.CustomRepository
import www.weather.com.domain.repository.MemberRepository
import www.weather.com.service.inter.MemberService

@Service
class MemberServiceImpl (
    private val memberRepository: MemberRepository,
    private val customRepository: CustomRepository
): MemberService {
    override fun signUp(member: MemberDTO) {
        val entity = Member(
            member.memIdx,
            member.memId,
            member.memPw,
            member.memEmail,
            member.memName,
            member.memPhone,
            member.memBirth
        )
        memberRepository.save(entity)
    }
}