package com.github.fernthedev.random_vocab

object Constants {

    @JvmStatic
    val RANDOM_WORDS = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt"

    @JvmStatic
     fun getLinkForWordDictionary(word: String) = "https://www.merriam-webster.com/dictionary/${word}"

    @JvmStatic
    fun getLinkForWordThesaurus(word: String) = "https://www.merriam-webster.com/thesaurus/${word}"
}