<?php

namespace PinBlooms\OptimizeJs\Plugin;

use Psr\Log\LoggerInterface;

class ReplaceScriptType
{
    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * Construtor function
     *
     * @param LoggerInterface $logger
     */
    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * Replace script type="text/javascript" with type="lazyload_int"
     *
     * @param \Magento\Framework\View\Result\Page $subject
     * @param \Magento\Framework\App\ResponseInterface $response
     * @return \Magento\Framework\App\ResponseInterface
     */
    public function afterRenderResult(\Magento\Framework\View\Result\Page $subject, $response)
    {
        // Get the body content from the response
        $body = $response->getBody();

        // Log the original body content (optional)
        $this->logger->info('Original Body: ' . $body);

        // Use preg_replace to handle variations in spacing
        $modifiedBody = preg_replace('/type\s*=\s*"text\/javascript"/i', 'type="lazyload_int"', $body);

        // Log the modified body content (optional)
        $this->logger->info('Modified Body: ' . $modifiedBody);

        // Set the modified content back to the response
        $response->setBody($modifiedBody);

        // Return the modified response
        return $response;
    }
}
