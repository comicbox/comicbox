package j

import "github.com/kardianos/service"

var (
	logger service.Logger
)

func SetLogger(log service.Logger) {
	logger = log
}

func Info(v ...interface{}) {
	logger.Info(v...)
}
func Warning(v ...interface{}) {
	logger.Warning(v...)
}
func Error(v ...interface{}) {
	logger.Error(v...)
}

func Infof(format string, v ...interface{}) {
	logger.Infof(format, v...)
}
func Warningf(format string, v ...interface{}) {
	logger.Warningf(format, v...)
}
func Errorf(format string, v ...interface{}) {
	logger.Errorf(format, v...)
}
