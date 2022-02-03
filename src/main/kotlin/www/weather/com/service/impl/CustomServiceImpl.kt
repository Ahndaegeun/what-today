package www.weather.com.service.impl

import www.weather.com.domain.repository.CustomRepository
import www.weather.com.domain.repository.MemberRepository
import www.weather.com.service.inter.CustomService

class CustomServiceImpl(
    private val memberRepository: MemberRepository,
    private val customRepository: CustomRepository
): CustomService {

}