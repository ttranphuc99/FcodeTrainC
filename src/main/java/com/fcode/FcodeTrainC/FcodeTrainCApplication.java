package com.fcode.FcodeTrainC;

import com.fcode.FcodeTrainC.file.FileStorageProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileStorageProperty.class
})
public class FcodeTrainCApplication {

	public static void main(String[] args) {
		SpringApplication.run(FcodeTrainCApplication.class, args);
	}

}
