package org.mabroukb.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import org.mabroukb.IntegrationTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@IntegrationTest
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
