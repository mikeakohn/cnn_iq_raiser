
default:
	@cd extension/chrome; \
	  jar cvMf cnn_iq_raiser.jar `find . -type f | grep -v .svn`; \
	  cd ../..
	@cd extension; zip -r ../cnn_iq_raiser.xpi \
	   chrome/cnn_iq_raiser.jar \
	   chrome.manifest \
	   install.rdf

clean:
	@rm -f extension/chrome/cnn_iq_raiser.jar
	@rm -f cnn_iq_raiser.xpi
	@echo "Clean!"

