package www.weather.com.domain.entity

import lombok.AllArgsConstructor
import lombok.Builder
import lombok.Getter
import lombok.NoArgsConstructor
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var memIdx: Int = 0

    var memId: String = ""
    var memPw: String = ""
    var memName: String = ""
}