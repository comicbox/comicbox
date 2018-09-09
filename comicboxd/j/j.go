package j

import (
	"github.com/fatih/color"
	"github.com/kardianos/service"
)

var (
	logger service.Logger
)

func SetLogger(log service.Logger) {
	logger = log
}

func Info(v ...interface{}) {
	color.Set(color.FgCyan)
	logger.Info(v...)
	color.Unset()
}
func Warning(v ...interface{}) {
	color.Set(color.FgYellow)
	logger.Warning(v...)
	color.Unset()
}
func Error(v ...interface{}) {
	color.Set(color.FgRed)
	logger.Error(v...)
	color.Unset()
}

func Infof(format string, v ...interface{}) {
	color.Set(color.FgCyan)
	logger.Infof(format, v...)
	color.Unset()
}
func Warningf(format string, v ...interface{}) {
	color.Set(color.FgYellow)
	logger.Warningf(format, v...)
	color.Unset()
}
func Errorf(format string, v ...interface{}) {
	color.Set(color.FgRed)
	logger.Errorf(format, v...)
	color.Unset()
}
