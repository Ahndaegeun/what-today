package www.weather.com.domain.entity

import javax.persistence.*

@Entity
class Custom (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var detailIdx: Long,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memIdx")
    var memIdx: Member,

    var detailClothName: String,
    var detailClimateStart: String,
    var detailClimateEnd: String
)

data class CustomDTO(
    var detailIdx: Int,
    var memIdx: Member,
    var detailClothName: String,
    var detailClimateStart: String,
    var detailClimateEnd: String
)