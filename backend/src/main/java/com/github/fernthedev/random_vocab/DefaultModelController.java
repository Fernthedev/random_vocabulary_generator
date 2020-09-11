package com.github.fernthedev.random_vocab;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DefaultModelController {
    @GetMapping(value = "/default", produces = "text/html")
    public String zDefaultPage() {
        return "default";
    }

//    @GetMapping(value = "/word", produces = "text/html")
//    public String zDefaultWordPage() {
//        return "word";
//    }
}
