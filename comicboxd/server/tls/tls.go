// Package tls configures http.Server with a TLSConfig, generating a self-signed certificate if needed.
// Based on https://github.com/GoogleChromeLabs/simplehttp2server/blob/master/tls.go
package tls

import (
	"crypto/ecdsa"
	"crypto/rand"
	"crypto/rsa"
	"crypto/tls"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"math/big"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/spf13/viper"
	"github.com/comicbox/comicbox/comicboxd/j"
)

var (
	validFrom  = time.Now()
	validFor   = 365 * 24 * time.Hour
	isCA       = true
	rsaBits    = 2048
	ecdsaCurve = ""
)

func getLocalIPs() ([]net.IP, error) {
	ifaces, err := net.Interfaces()
	ips := []net.IP{}

	if err != nil {
		return ips, err
	}
	for _, i := range ifaces {
		addrs, err := i.Addrs()
		if err != nil {
			continue
		}

		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}
			ips = append(ips, ip)
		}
	}
	return ips, nil
}

func publicKey(priv interface{}) interface{} {
	switch k := priv.(type) {
	case *rsa.PrivateKey:
		return &k.PublicKey
	case *ecdsa.PrivateKey:
		return &k.PublicKey
	default:
		return nil
	}
}

func pemBlockForKey(priv interface{}) *pem.Block {
	switch k := priv.(type) {
	case *rsa.PrivateKey:
		return &pem.Block{Type: "RSA PRIVATE KEY", Bytes: x509.MarshalPKCS1PrivateKey(k)}
	case *ecdsa.PrivateKey:
		b, err := x509.MarshalECPrivateKey(k)
		if err != nil {
			j.Errorf("Unable to marshal ECDSA private key: %v", err)
			os.Exit(2)
		}
		return &pem.Block{Type: "EC PRIVATE KEY", Bytes: b}
	default:
		return nil
	}
}

func generateCertificates(hosts []net.IP, certFile, keyFile string) error {
	var priv interface{}
	var err error
	priv, err = rsa.GenerateKey(rand.Reader, rsaBits)
	if err != nil {
		j.Errorf("failed to generate private key: %s", err)
		return err
	}

	var notBefore = validFrom
	notAfter := notBefore.Add(validFor)

	serialNumberLimit := new(big.Int).Lsh(big.NewInt(1), 128)
	serialNumber, err := rand.Int(rand.Reader, serialNumberLimit)
	if err != nil {
		j.Errorf("failed to generate serial number: %s", err)
		return err
	}

	template := x509.Certificate{
		SerialNumber: serialNumber,
		Subject: pkix.Name{
			Organization: []string{"ComicBox"},
		},
		NotBefore: notBefore,
		NotAfter:  notAfter,

		KeyUsage:              x509.KeyUsageKeyEncipherment | x509.KeyUsageDigitalSignature,
		BasicConstraintsValid: true,
	}

	for _, ip := range hosts {
		template.IPAddresses = append(template.IPAddresses, ip)
	}

	if isCA {
		template.IsCA = true
		template.KeyUsage |= x509.KeyUsageCertSign
	}

	derBytes, err := x509.CreateCertificate(rand.Reader, &template, &template, publicKey(priv), priv)
	if err != nil {
		j.Errorf("Failed to create certificate: %s", err)
		return err
	}

	certOut, err := os.Create(certFile)
	if err != nil {
		j.Errorf("failed to open cert.pem for writing: %s", err)
		return err
	}
	pem.Encode(certOut, &pem.Block{Type: "CERTIFICATE", Bytes: derBytes})
	certOut.Close()
	j.Info("written cert\n")

	keyOut, err := os.OpenFile(keyFile, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		j.Errorf("failed to open key.pem for writing:", err)
		return err
	}
	pem.Encode(keyOut, pemBlockForKey(priv))
	keyOut.Close()
	j.Info("written key\n")

	return nil
}

func ConfigureTLS(server *http.Server) error {
	if _, err := os.Stat(viper.GetString("tls-cert")); err != nil {
		hosts, _ := getLocalIPs()

		j.Info("Generating certificate... ", hosts)
		os.MkdirAll(filepath.Dir(viper.GetString("tls-cert")), 0777)

		generateCertificates(hosts, viper.GetString("tls-cert"), viper.GetString("tls-key"))
	}

	cert, err := tls.LoadX509KeyPair(viper.GetString("tls-cert"), viper.GetString("tls-key"))
	if err != nil {
		j.Errorf("Failed to load X509 key pair:", err)
		return err
	}

	if server.TLSConfig == nil {
		server.TLSConfig = &tls.Config{}
	}
	server.TLSConfig.PreferServerCipherSuites = true
	server.TLSConfig.NextProtos = append(server.TLSConfig.NextProtos, "http/1.1")
	server.TLSConfig.Certificates = []tls.Certificate{cert}
	return nil
}
