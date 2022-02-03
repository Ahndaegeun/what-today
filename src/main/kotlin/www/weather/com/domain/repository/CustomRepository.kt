package www.weather.com.domain.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import www.weather.com.domain.entity.Custom

@Repository
interface CustomRepository: JpaRepository<Custom, Long>