package www.weather.com.domain.entity

import lombok.Builder
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
@Builder
class Member(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var memIdx: Long,
    var memId: String,
    var memPw: String,
    var memEmail: String,
    var memName: String,
    var memPhone: String,
    var memBirth: LocalDate
)

data class MemberDTO (
    var memIdx: Long,
    var memId: String,
    var memPw: String,
    var memEmail: String,
    var memName: String,
    var memPhone: String,
    var memBirth: LocalDate
)